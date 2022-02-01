import React from "react";
import Header from "./component/Header";
import Logo from "./assets/images/immo-logo.svg";
import FilterComponent from "./component/FilterComponent";
import { DetailTableData, Filters } from "./models/propertyModel";
import {
  fetchProperties,
  fetchPropertyDetails,
  getAvailablePropertyTypes,
} from "./store/api";
import SearchComponent from "./component/SearchComponent/SearchComponent";
import SelectedProperties from "./component/SelectedProperties/SelectedProperties";
import SearchResults from "./component/SearchResults/SearchResults";

interface MyProps {
  // using `interface` is also ok
}
interface MyState {
  selectedProperty: string;
  propertyTypes: Filters[];
  searchValue: string;
  searchResults: DetailTableData[];
}

class App extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      selectedProperty: "ALL",
      propertyTypes: [],
      searchValue: "",
      searchResults: [],
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

  async fetchAddress() {
    // checking if address is empty
    if (!this.state.searchValue || this.state.searchValue === "") {
      alert("Please Enter a Address");
      return;
    }
    let tempData = this.state.searchResults.filter(
      (data) => data.isSelected === true
    );
    //fetching data from fetchProperties
    let availableProperty = await fetchProperties({
      address: this.state.searchValue,
    });

    // checking if data is not empty
    if (availableProperty.properties.length <= 0) {
      alert("No Data Found");
      return;
    }

    // inserting  data searched
    let getPropertyDetails = await Promise.all(
      availableProperty.properties.map(async ({ id }) => {
        let tempIndex = tempData.findIndex((i) => i.id === id);

        if (tempIndex > -1) {
          return tempData[tempIndex];
        } else {
          let detailData = await fetchPropertyDetails(id);
          return { ...detailData.property, isSelected: false };
        }
      })
    );
    // adding back selected data value
    tempData.forEach((td) => {
      let tempIndex = getPropertyDetails.findIndex((i) => i.id === td.id);

      if (tempIndex < 0) {
        getPropertyDetails.unshift(td);
      }
    });
    // pushing back in the state
    this.setState({ searchResults: getPropertyDetails });
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
                <SearchComponent
                  onSearch={async () => {
                    this.fetchAddress();
                  }}
                  onChange={(e) => {
                    this.setState({ searchValue: e.target.value });
                  }}
                  value={this.state.searchValue}
                />
              </div>
              <div className="app__seclected-prop">
                <div className="app__seclected-prop-container">
                  {/* selected properties component */}
                  <SelectedProperties
                    data={this.state.searchResults.filter(
                      (data) => data.isSelected === true
                    )}
                  />
                </div>
              </div>
              <div className="app__search-results">
                <div className="app__main--filter">
                  {/* filter property type component */}
                  <FilterComponent
                    data={this.state.propertyTypes}
                    title={`Property Types`}
                    selectedProperty={this.state.selectedProperty}
                    onSelectedvalue={(value) => {
                      this.setState({ selectedProperty: value });
                    }}
                  />
                </div>
                <div className="app__main--show-result">
                  {/* search result component */}
                  <SearchResults
                    allowSelect={true}
                    data={this.state.searchResults}
                    selectedProperty={this.state.selectedProperty}
                    onCheckBoxChange={(value, rowData) => {
                      let tempData = this.state.searchResults;
                      let tempIdx = tempData.findIndex(
                        ({ id }) => id === rowData.id
                      );
                      tempData[tempIdx].isSelected = value;
                      this.setState({ searchResults: tempData });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
