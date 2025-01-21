import React from 'react';

const StudentDash = () => {
    return (
<div className="drawer lg:drawer-open pt-20">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label
      htmlFor="my-drawer-2"
      className="btn btn-primary drawer-button lg:hidden"
    >
      Open drawer
    </label>
    <div>
      {/* Main content */}
      <h1 className='bg-white'>Main Content Area</h1>
    </div>
  </div>
  <div className="drawer-side">
    <label
      htmlFor="my-drawer-2"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li>
        <a>Sidebar Item 1</a>
      </li>
      <li>
        <a>Sidebar Item 2</a>
      </li>
    </ul>
  </div>
</div>

    );
};

export default StudentDash;