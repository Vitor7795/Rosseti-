#!/usr/bin/env bash
# Uso: ./extrair-frames.sh meu-video.mp4
# Gera 121 quadros em frames/frame_0001.jpg ... frame_0121.jpg (1280x720)
set -e
[ -z "$1" ] && { echo "Uso: ./extrair-frames.sh video.mp4"; exit 1; }
mkdir -p frames
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$1")
FPS=$(awk -v d="$DUR" 'BEGIN{printf "%.4f", 121/d}')
ffmpeg -y -i "$1" -vf "fps=$FPS,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" -frames:v 121 -q:v 4 frames/frame_%04d.jpg
echo "Pronto: $(ls frames/*.jpg | wc -l) quadros em frames/"
