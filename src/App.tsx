import React from "react";
import Header from "./component/Header";
import Logo from "./assets/images/immo-logo.svg";
import FilterComponent from "./component/FilterComponent";
import { DetailTableData, MyState } from "./models/propertyModel";
import { getAvailablePropertyTypes } from "./store/api";
import SearchComponent from "./component/SearchComponent/SearchComponent";
import SelectedProperties from "./component/SelectedProperties/SelectedProperties";
import SearchResults from "./component/SearchResults/SearchResults";
import { PropertyProvider } from "./context/propertyContext";

interface MyProps {}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      selectedProperty: "ALL",
      propertyTypes: [],
      searchValue: "",
      searchResults: [],
      selectedData: [],
    };
  }

  componentDidMount() {
    // fetching property type on first load
    this.initialFetch();
  }

  async initialFetch() {
    let data = await getAvailablePropertyTypes();

    this.setState({
      propertyTypes: [{ label: "All", value: "ALL" }, ...data.propertyTypes],
    });
  }

  render(): JSX.Element {
    return (
      <div className="app">
        <div>
          <PropertyProvider
            value={{
              ...this.state,
              setSearchValue: (value: string) => {
                this.setState({ searchValue: value });
              },
              setSearchResults: (data: DetailTableData[] | undefined) => {
                if (data) this.setState({ searchResults: data });
              },
              setSearchPropertyType: (value: string) => {
                this.setState({ selectedProperty: value });
              },
              setSelectedData: (data: DetailTableData[]) => {
                this.setState({ selectedData: data });
              },
            }}
          >
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
          </PropertyProvider>
        </div>
      </div>
    );
  }
}

export default App;
