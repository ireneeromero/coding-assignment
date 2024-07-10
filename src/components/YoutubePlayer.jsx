import ReactPlayer from 'react-player';
import '../styles/youtube.scss';

const YoutubePlayer = ({ videoKey, onClose }) => (
  <div className="modal-container" data-testid="youtube-modal">
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal-content-wrapper">
      <button className="close-button" onClick={onClose}>&times;</button>
      <div className="video-player-content">
        <ReactPlayer
          className="video-player"
          url={`https://www.youtube.com/watch?v=${videoKey}`}
          controls={true}
          playing={true}
          data-testid="youtube-player"
        />
      </div>
    </div>
  </div>
);

export default YoutubePlayer;
