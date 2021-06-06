import React, { Component } from "react";
import UserInfo from "../UserInfo/UserInfo";
import "./Pagination.css";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: Math.ceil(props.pageData.length / props.pageDataLimit),
      currentPage: 1,
    };
  }
  componentDidUpdate(prevProps) {
    const { pageData, pageDataLimit } = this.props;
    if (prevProps.pageData !== pageData) {
      this.setState({
        pages: Math.ceil(pageData.length / pageDataLimit),
        currentPage: 1,
      });
    }
  }

  goToNextPage = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
  };

  goToPreviousPage = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
  };

  changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    this.setState({ currentPage: pageNumber });
  };

  getPaginatedData = () => {
    const startIndex =
      this.state.currentPage * this.props.pageDataLimit -
      this.props.pageDataLimit;
    const endIndex = startIndex + this.props.pageDataLimit;
    return this.props.pageData.slice(startIndex, endIndex);
  };

  getPaginationGroup = () => {
    let start =
      Math.floor((this.state.currentPage - 1) / this.props.pageLimit) *
      this.props.pageLimit;
    let pageRange;
    if (start + this.props.pageLimit > this.state.pages) {
      pageRange = this.state.pages - start;
    } else {
      pageRange = this.props.pageLimit;
    }
    return new Array(pageRange).fill().map((_, idx) => start + idx + 1);
  };

  render() {
    const { currentPage, pages } = this.state;
    const { pageData } = this.props;
    return (
      <div className="pagination">
        {typeof pageData == "string" ? (
          pageData
        ) : (
          <>
            <div className="pagination__data">
              {this.getPaginatedData().map((data) => (
                <UserInfo key={data.id} user={data} />
              ))}
            </div>

            <div className="pagination__buttons">
              <button
                onClick={this.goToPreviousPage}
                className={`pagination__btnList ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                &lt;
              </button>

              {this.getPaginationGroup().map((item) => (
                <button
                  key={item}
                  onClick={this.changePage}
                  className={`pagination__btnList ${
                    currentPage === item ? "active" : null
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                onClick={this.goToNextPage}
                className={`pagination__btnList ${
                  currentPage === pages ? "disabled" : ""
                }`}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Pagination;
