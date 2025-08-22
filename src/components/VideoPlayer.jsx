import { useRef } from 'react'

export default function VideoPlayer() {
  const videoRef = useRef(null)
  const selectRef = useRef(null)

  const videos = [
  {
    label: 'Big Buck Bunny (CDN)',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  { label: 'Local: Video 1', src: '/videos/101379-video-720.mp4' },
]


  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.play()
  }

  const pause = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
  }

  const seek = (deltaSeconds) => {
    const v = videoRef.current
    if (!v) return
    const duration = Number.isFinite(v.duration) ? v.duration : Infinity
    const next = Math.min(duration, Math.max(0, v.currentTime + deltaSeconds))
    v.currentTime = next
  }

  const rewind5 = () => seek(-5)
  const forward5 = () => seek(+5)

  const fullscreen = () => {
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen()
    else if (v.msRequestFullscreen) v.msRequestFullscreen()
  }

  const switchVideo = (src) => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.src = src
    v.load()
    v.currentTime = 0
    v.play().catch(() => {
    })
  }

  const onSelectChange = () => {
    const src = selectRef.current?.value
    if (src) switchVideo(src)
  }

  return (
    <div className="player">
      <label className="picker">
        <span>Choose video:</span>
        <select ref={selectRef} onChange={onSelectChange} defaultValue={videos[0].src}>
          {videos.map((v) => (
            <option key={v.src} value={v.src}>
              {v.label}
            </option>
          ))}
        </select>
      </label>

      <video
        ref={videoRef}
        src={videos[0].src}
        className="video"
        preload="metadata"
        controls={false}
      />

      <div className="controls">
        <button onClick={play} aria-label="Play">Play</button>
        <button onClick={pause} aria-label="Pause">Pause</button>
        <button onClick={rewind5} aria-label="Rewind 5 seconds">-5s</button>
        <button onClick={forward5} aria-label="Forward 5 seconds">+5s</button>
        <button onClick={fullscreen} aria-label="Fullscreen">Fullscreen</button>
      </div>
    </div>
  )
}
