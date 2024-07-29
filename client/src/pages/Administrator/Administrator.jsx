import React, { useState } from 'react';
import './Administrator.css';
import Adminheader from '../../components/Adminheader/Adminheader';
import Nfooter from '../../components/n-footer/Nfooter';
import GenerateTimeTable from '../../components/GenerateTimeTable/GenerateTimeTable';
import Sidebar from '../../components/sidebar/Sidebar';
import Viewtimetable from '../../components/viewtimetable/Viewtimetable';

const Administrator = () => {
  const [select, setisSelected] = useState(true);
  const [select1, setisSelected1] = useState(false);
  const [select2, setisSelected2] = useState(false);
  const [select3, setisSelected3] = useState(false);
  const [select4, setisSelected4] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSelect = (index) => {
    switch (index) {
      case 0:
        setisSelected(true);
        setisSelected1(false);
        setisSelected2(false);
        setisSelected3(false);
        setisSelected4(false);
        break;
      case 1:
        setisSelected(false);
        setisSelected1(true);
        setisSelected2(false);
        setisSelected3(false);
        setisSelected4(false);
        break;
      case 2:
        setisSelected(false);
        setisSelected1(false);
        setisSelected2(true);
        setisSelected3(false);
        setisSelected4(false);
        break;
      case 3:
        setisSelected(false);
        setisSelected1(false);
        setisSelected2(false);
        setisSelected3(true);
        setisSelected4(false);
        break;
      case 4:
        setisSelected(false);
        setisSelected1(false);
        setisSelected2(false);
        setisSelected3(false);
        setisSelected4(true);
        break;
      default:
        break;
    }
  };

  const renderComponent = () => {
    if (select) {
      return <GenerateTimeTable />;
    } else if (select1) {
      return <Viewtimetable />;
    // Uncomment and add the components when available
    // } else if (select2) {
    //   return <LecturersAvailable />;
    // } else if (select3) {
    //   return <CoursesAvailable />;
    // } else if (select4) {
    //   return <TimeSchedule />;
    } else {
      return <GenerateTimeTable />;
    }
  };

  return (
    <div>
      <Adminheader />
      {showSidebar && (
        <Sidebar
          select={select}
          select1={select1}
          select2={select2}
          select3={select3}
          select4={select4}
          handleSelect={handleSelect}
        />
      )}
      {renderComponent()}
      <Nfooter />
    </div>
  );
};

export default Administrator;
