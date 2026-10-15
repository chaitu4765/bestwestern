import {useEffect,useRef} from 'react';

// Original GLSL implementation. The 21st Waves source retrieval was quota-blocked.
export function WaveShader({paused}:{paused:boolean}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
  const shaders:WebGLShader[]=[];
  function compile(type:number,source:string){const shader=gl!.createShader(type);if(!shader)return null;gl!.shaderSource(shader,source);gl!.compileShader(shader);if(!gl!.getShaderParameter(shader,gl!.COMPILE_STATUS)){gl!.deleteShader(shader);return null;}shaders.push(shader);return shader;}
  const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}');
  const fragment=compile(gl.FRAGMENT_SHADER,`precision mediump float;
uniform vec2 resolution; uniform float time; uniform vec2 pointer;
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float y=uv.y+sin(uv.x*5.0+time*.32)*.10+cos(uv.x*9.0-time*.23)*.035;
 float tide=sin(y*19.0+uv.x*2.0-time*.40);
 float foam=smoothstep(.86,.99,tide)*.19;
 float glow=1.0-smoothstep(.0,.75,distance(uv,pointer));
 vec3 deep=vec3(.0,.235,.494);vec3 blue=vec3(.045,.37,.65);
 vec3 color=mix(deep,blue,(sin(y*8.0+time*.15)*.5+.5)*.7+glow*.14);
 color=mix(color,vec3(.88,.96,1.),foam);
 gl_FragColor=vec4(color,1.);
}`);
  if(!vertex||!fragment){shaders.forEach(s=>gl.deleteShader(s));return;}
  const program=gl.createProgram();const buffer=gl.createBuffer();if(!program||!buffer)return;
  gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
  gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const resolution=gl.getUniformLocation(program,'resolution'),time=gl.getUniformLocation(program,'time'),pointer=gl.getUniformLocation(program,'pointer');
  let frame=0,visible=true,last=0,elapsed=0;let px=.5,py=.5;
  function draw(ms:number){frame=0;if(!visible||document.hidden)return;if(ms-last<33&&!paused){frame=requestAnimationFrame(draw);return;}elapsed+=paused?0:Math.min((ms-last)/1000,.05);last=ms;const width=Math.max(1,Math.round(canvas!.clientWidth)),height=Math.max(1,Math.round(canvas!.clientHeight));if(canvas!.width!==width||canvas!.height!==height){canvas!.width=width;canvas!.height=height;}gl!.viewport(0,0,width,height);gl!.uniform2f(resolution,width,height);gl!.uniform1f(time,elapsed);gl!.uniform2f(pointer,px,py);gl!.drawArrays(gl!.TRIANGLES,0,6);if(!paused)frame=requestAnimationFrame(draw);}
  function start(){if(!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}});observer.observe(canvas);
  const resize=new ResizeObserver(start);resize.observe(canvas);
  const move=(e:PointerEvent)=>{const box=canvas.getBoundingClientRect();px=(e.clientX-box.left)/box.width;py=1-(e.clientY-box.top)/box.height;};
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();};
  canvas.addEventListener('pointermove',move);document.addEventListener('visibilitychange',visibility);start();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();canvas.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);gl.deleteBuffer(buffer);gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s));};
 },[paused]);
 return <canvas className="wave-shader" ref={ref} aria-hidden="true"/>;
}
