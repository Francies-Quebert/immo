import React from "react";
import Header from "./component/Header";
// import Logo from "./assets/images/immo-logo.svg";
import Logo from "./logo.svg";
import FilterComponent from "./component/FilterComponent";
import { Filters, MyState } from "./models/propertyModel";
import { getAvailablePropertyTypes } from "./api/api";
import SearchComponent from "./component/SearchComponent/SearchComponent";
import SelectedProperties from "./component/SelectedProperties/SelectedProperties";
import SearchResults from "./component/SearchResults/SearchResults";
import { connect } from "react-redux";
import { setAvailablePropertyTypes } from "./store/reducers/propertyReducer";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface MyProps {
  setAvailablePropertyTypes: ActionCreatorWithPayload<Filters[], string>;
}

class App extends React.Component<MyProps, MyState> {
  componentDidMount() {
    // fetching property type on first load
    this.initialFetch();
  }

  async initialFetch() {
    let data = await getAvailablePropertyTypes();
    this.props.setAvailablePropertyTypes([
      { value: "ALL", label: "All" },
      ...data.propertyTypes,
    ]);
  }

  render(): JSX.Element {
    return (
      <div className="app">
        <div>
          {/*Header Component with title and Logo*/}
          <Header title="Property search tool" Image={Logo} />
          <div className="app__main">
            <div className="app__main--filter-table">
              <div className="app__seclected-prop-container">
                {/* search component */}
                <SearchComponent />
              </div>
              <div className="app__seclected-prop">
                <div className="app__seclected-prop-container">
                  {/* selected properties component */}
                  <SelectedProperties />
                </div>
              </div>
              <div className="app__search-results">
                <div className="app__main--filter">
                  {/* filter property type component */}
                  <FilterComponent />
                </div>
                <div className="app__main--show-result">
                  {/* search result component */}
                  <SearchResults />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { setAvailablePropertyTypes })(App);
