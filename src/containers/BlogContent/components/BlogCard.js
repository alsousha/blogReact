import './BlogCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

export const BlogCard = ({
  title,
  description,
  liked,
  likePost,
  handleEditdFormShow,
  deletePost,
}) => {
  const heartFill = liked ? 'crimson' : 'black';

  return (
    <div className='post'>
      <div className='postContent'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      <div className='postBtns'>
        <button className='editBtn' onClick={handleEditdFormShow}>
          <EditIcon />
        </button>
        <button className='deleteBtn' onClick={deletePost}>
          <DeleteForeverIcon />
        </button>
      </div>
    </div>
  );
};
