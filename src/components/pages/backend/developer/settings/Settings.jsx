import React from "react";

import Footer from "../../partials/Footer";
import SettingList from "../../settings/SettingList";

import SideNavigation from "../../partials/SideNavigation";
import Header from "../../partials/Header";

const Settings = () => {
  return (
    <>
      <section className="layout-main">
        <div className="layout-div">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Settings" subtitle="Welcome to WorldPeas" />
            <div className="p-5">
              <SettingList/>
            </div>


            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Settings;