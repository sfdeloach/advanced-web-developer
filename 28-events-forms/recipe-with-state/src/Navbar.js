function Navbar({ displayMode, onDisplayClick }) {
  return (
    <div className='navbar'>
      <div className='logo'>
        <span className='material-symbols-outlined'>settings</span>
        <div className='subtitle'>Frameworks</div>
      </div>
      <div className='menu'>
        <div className='menu-item' onClick={() => console.log("add item click")}>
          <span className='material-symbols-outlined'>add_circle</span>
          <div>Add</div>
        </div>
        <div className='menu-item' onClick={onDisplayClick}>
          <span className='material-symbols-outlined'>{displayMode}</span>
        </div>
      </div>
      <div className='dropdown'>
        <span className='material-symbols-outlined'>menu</span>
      </div>
    </div>
  );
}

export default Navbar;
