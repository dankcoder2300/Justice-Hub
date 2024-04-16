import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  logout = () => {
    localStorage.setItem("username", "notexists");
    window.location = "/";
  };
  showAlert(e) {
    const type = localStorage.getItem("type");
    console.log("hellooooo");
    if (type === "Lawyer") {
      alert("You have pay $50 to view the cases");
    }
  }
  render() {
    const user = localStorage.getItem("username");
    const registrar = localStorage.getItem("registrar");
    const type = localStorage.getItem("type");
    console.log(user);
    console.log(registrar);
    return (
      <nav
        class="navbar navbar-expand-lg navbar-light"
        style={{ background: "#e3f2fd" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Judiciary Information System
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul
              class="navbar-nav"
              style={{ alignItems: "center", width: "100%" }}
            >
              {user === "exists" && (
                <>
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      aria-current="page"
                      href="/caseList"
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    {type === "Registrar" && (
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Create Cases
                      </a>
                    )}
                    <ul class="dropdown-menu">
                      {type === "Registrar" && (
                        <>
                          <li>
                            <a class="dropdown-item" href="/create">
                              Upcoming Cases
                            </a>
                          </li>
                        </>
                      )}
                      {type === "Registrar" && (
                        <>
                          <li>
                            <a class="dropdown-item" href="/create">
                              Pending Cases
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <a class="dropdown-item" href="/create">
                          Resolved Cases
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={this.showAlert}
                    >
                      View Cases
                    </a>
                    <ul class="dropdown-menu">
                      {type === "Registrar" && (
                        <>
                          <li>
                            <a class="dropdown-item" href="/upcomingCase">
                              Upcoming Cases
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        {type === "Registrar" && (
                          <>
                            <li>
                              <a class="dropdown-item" href="/pendingCase">
                                Pending Cases
                              </a>
                            </li>
                          </>
                        )}
                        <li>
                          <a class="dropdown-item" href="/pastCase">
                            Resolved Cases
                          </a>
                        </li>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {user !== "exists" && (
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  <li class="nav-item">
                    <a class="nav-link" href="/RegisterUser">
                      Register User
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/">
                      Login
                    </a>
                  </li>
                </div>
              )}
            </ul>
            {user === "exists" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                  gap: "2em"
                }}
              >
                <form class="form-inline my-2 my-lg-0">
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "5%" }}>
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                    </div>
                    <div style={{ marginRight: "auto" }}>
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
                <Link onClick={this.logout} className="btn ">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
