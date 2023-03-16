const commentCounter = () => {
  const commentArray = document.querySelectorAll('.comments-counter');
  return commentArray.length;
};

export default commentCounter;