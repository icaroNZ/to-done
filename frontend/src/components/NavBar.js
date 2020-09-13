import React from 'react';

function NavBar({ searchInfo, setSearchInfo, searchBarRef }) {
  return (
    <div data-uk-sticky='self-target: .uk-navbar-container; cls-active: uk-navbar-sticky'>
      <nav className='uk-navbar-container' data-uk-navbar>
        <div className='uk-navbar-left'>
          <span className='uk-navbar-item uk-logo'>To-Done</span>
        </div>

        <div className='uk-navbar-right'>
          <div>
            <span className='uk-navbar-toggle' data-uk-search-icon></span>
            <div
              className='uk-drop'
              data-uk-drop='mode: click; pos: left-center; offset: 0'
            >
              <form className='uk-search uk-search-navbar uk-witdh-1-1'>
                <input
                  type='search'
                  className='uk-search-input'
                  placeholder='search...'
                  autoFocus
                  ref={searchBarRef}
                  value={searchInfo.searchTerm}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSearchInfo((draft) => {
                      draft.searchTerm = value;
                    });
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
