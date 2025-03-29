import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import SettingList from "./SettingList";

const Settings = () => {
  return (
    <>
      <section className="layout-main text-body">
        <div className="layout-division">
          <SideNavigation menu="settings" />
          <main>
            <Header title="Settings" subtitle="Welcome to WorldPeas!" />
            <div className="p-8">
              <SettingList />
            </div>
            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Settings;