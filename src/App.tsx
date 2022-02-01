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
  selectedData: DetailTableData[];
}

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

  async fetchAddress() {
    // checking if address is empty
    if (!this.state.searchValue || this.state.searchValue === "") {
      alert("Please Enter a Address");
      return;
    }
    let tempData = this.state.selectedData;
    //fetching data from fetchProperties
    let availableProperty = await fetchProperties({
      address: this.state.searchValue,
    });

    // checking if data is not empty
    if (availableProperty.properties.length <= 0) {
      alert("No Data Found");
      return;
    }
    console.log(tempData);
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
                  <SelectedProperties data={this.state.selectedData} />
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
                      let tempSelectedData = this.state.selectedData;
                      let tempSearchResult = this.state.searchResults;
                      const tempSelIdx = tempSelectedData.findIndex(
                        (dd) => dd.id === rowData.id
                      );
                      const tempIdx = tempSearchResult.findIndex(
                        (dd) => dd.id === rowData.id
                      );
                      if (tempSelIdx < 0) {
                        tempSelectedData.push({
                          ...rowData,
                          isSelected: true,
                        });
                        tempSearchResult[tempIdx].isSelected = true;
                      } else {
                        tempSearchResult[tempIdx].isSelected = false;
                        tempSelectedData = tempSelectedData.filter(
                          (dd) => dd.id !== rowData.id
                        );
                      }
                      console.log({
                        selectedData: tempSelectedData,
                        searchResults: tempSearchResult,
                      });
                      this.setState({
                        selectedData: tempSelectedData,
                        searchResults: tempSearchResult,
                      });
                    }}
                    selectedData={this.state.selectedData}
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
