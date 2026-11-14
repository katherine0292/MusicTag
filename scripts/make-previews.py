"""Create lightweight README previews from the actual operation videos."""
from pathlib import Path
import subprocess,os
r=Path(__file__).resolve().parents[1]/'assets/recordings'
ff=os.environ.get('FFMPEG')
if not ff:
 import imageio_ffmpeg
 ff=imageio_ffmpeg.get_ffmpeg_exe()
for name in ['01-listening','02-search-recovery','03-family','04-preferences','05-musictag-setup','musictag-early-full']:
 geometry='scale=640:-1:flags=lanczos' if name.startswith('musictag') else 'crop=440:850:620:90,scale=280:-1:flags=lanczos'
 filter=f'[0:v]fps=6,{geometry},split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=4'
 subprocess.run([ff,'-y','-i',str(r/(name+'.mp4')),'-filter_complex',filter,'-loop','0',str(r/(name+'.gif'))],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=True)
 print(name,(r/(name+'.gif')).stat().st_size,flush=True)
