import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../Header";
import molecules from "../../assets/images/3dmolecules.png";
import icon_mol from "../../assets/images/molecule.png";
import "./index.css";
import icon_1 from "../../assets/images/chemistry.png";
import engine from "../../assets/images/cogwheel.png";
import quantum from "../../assets/images/quantum.png";
import chemlab from "../../assets/images/chemical_lab.jpg";
import database from "../../assets/images/database.png";
import facebookLogo from "../../assets/images/LinkedIn.svg";
import twitterLogo from "../../assets/images/twitter.svg";
import instagramLogo from "../../assets/images/instagram.svg";
import ketcherdemo from "../../assets/images/chemalive_demo.png";
import video from "../../assets/video/video.mov";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner">
          <Header />
          <div className="main-message">
            <div className="main-message-left">
              <p className="bannerText">Design Sustainable Chemistry </p>
              <p className="whiteText">
                Using advanced quantum chemical prediction in models 2D and 3D
              </p>
            </div>
            <div className="main-message-right">
              <video loop={true} autoPlay={true} width="720" height="480">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag. Please upgrade your
                browser.
              </video>
            </div>
          </div>

          <Link to="/registration/">
            <button className="transpButton1">TRY FOR FREE</button>
          </Link>
        </div>
        <div className="product_description">
          <div className="description">
            <h2 className="title">About ConstruQt API</h2>
            <div className="details">
              <p>
                ConstruQt is our core molecular design tool that underpins all
                other automation and machine learning technologies that
                ChemAlive is developing. It is currently available as an API and
                allows for quick deployment of quantum chemical calculations to
                enhance your chemistry in the following ways:
              </p>
            </div>
          </div>

          <div className="features_wrapper">
            <div className="features">
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  Transforms list of SMILES or InChI molecular designations into
                  state-of-the-art 3D molecular structures in SD format
                </div>
              </div>
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  Manages the conformational space of the molecules with a
                  robust shape searching algorithm{" "}
                </div>
              </div>
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  Generates all reasonable tautomeric forms of the molecule and
                  prioritizes them by energy{" "}
                </div>
              </div>
            </div>
            <div className="picture">
              <img src={molecules} height="200px" alt="molecules-small" />
            </div>
          </div>

          <div className="features_wrapper2">
            <div className="picture1">
              <img src={chemlab} width='90%' style={{opacity: '0.9'}} alt="molecules-small" />
            </div>
            <div className="features">
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  Generates all diastereomeric forms of the molecules and
                  differentiates them by energy
                </div>
              </div>
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  All molecules are stored in our unique database architecture
                  making the calculations easily augmented and carried through
                  to other processes
                </div>
              </div>
              <div className="feature">
                <img
                  className="feature_icon"
                  src={icon_mol}
                  height="30px"
                  alt="icon"
                />
                <div className="text">
                  We currently maintain the largest quantum chemical database
                  known. We are building a contextual data structure
                  commensurate with advanced machine learning algorithms. It is
                  called Qontext.
                </div>
              </div>
            </div>
          </div>
          <div className="section2">
            <br />
            <h2 className="title-blue">ConstruQt Specifications</h2>
            <div className="cards">
              <div className="custom_card">
                <img
                  className="card_icon"
                  src={quantum}
                  height="40px"
                  alt="icon"
                />
                <div>
                  <h3>Quantum Chemistry</h3>
                  <p className="text">
                    ConstruQt provides a sea-change in accuracy and scope for
                    molecular modeling. Moving away from alchemical rules-based
                    prediction, ConstruQt computes molecular energies and
                    electronic properties from fundamental physics. With quantum
                    chemistry you get not just what is possible, but what is
                    probable.{" "}
                  </p>
                </div>
              </div>
              <div className="custom_card">
                <img
                  className="card_icon"
                  src={icon_1}
                  height="40px"
                  alt="icon"
                />
                <div>
                  <h3>Functionality</h3>
                  <p className="text">
                    Conformations - Molecular shape is 70% of drug discovery and
                    key to all follow-on calculations at more accurate levels.
                    Legacy methods are unable to accurately predict molecular
                    shape. Tautomers - Fundamental to acidity constants and
                    binding affinities, you need to know which tautomer is most
                    stable to understand your structure based determination.
                  </p>
                </div>
              </div>
              <div className="custom_card">
                <img
                  className="card_icon"
                  src={engine}
                  height="40px"
                  alt="icon"
                />
                <div>
                  <h3>Engine</h3>
                  <p className="text">
                    The core ConstruQt computational approach centers around
                    cheminformatics management, classical mechanics initial
                    guess and follow-on semi-empirical quantum chemical
                    calculations for energy assessment. Density functional
                    theory calculations can be launched as well. ConstruQt is
                    available as an API to connect to the ChemAlive AWS
                    Supercomputer. With Dynamic scalability, ConstruQt can
                    handle up to 5,00 unique molecules per minute per server
                    (depending on size and rotational degrees of freedom)
                  </p>
                </div>
              </div>
              <div className="custom_card">
                <img
                  className="card_icon"
                  src={database}
                  height="40px"
                  alt="icon"
                />
                <div>
                  <h3>Database</h3>
                  <p className="text">
                    The ChemAlive postgreSQL database, Qontext, is built by
                    chemists for chemists. The API additionally allows access to
                    the largest repository of quantum chemical data maintained
                    in the ChemAlive database. ConstruQt allows direct access to
                    this high quality data by library or single molecule
                    searching. Submissions to Qontext will contextualize
                    molecular structure based on the computations requested.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-details">
          <div className="contact-inputs">
            <h2 className="title">CONTACT US</h2>

            <form className="feedback-form">
              <input type="text" placeholder="Your name*" />
              <input placeholder="Your email*" />
              <textarea className="message" placeholder="Your message*" />
              <div className="contact-button-div">
                <button className="contact-button">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer">
          <div className="footer-upper">
            <div className="footer_left">
              <div className="footer_element">
                <h4 className="footer_header">Product</h4>
                <p className="footer-link">Network</p>
                <p className="footer-link">Features</p>
                <p className="footer-link">Pricing</p>
                <p className="footer-link">Documentation</p>
              </div>
              <div className="footer_element">
                <h4 className="footer_header">Information</h4>
                <p className="footer-link">About Us</p>
                <p className="footer-link">Privacy Policy</p>
                <p className="footer-link">Terms and Conditions</p>
                <p className="footer-link">Press Enquiries</p>
              </div>
              <div className="footer_element">
                <h4 className="footer_header">Company</h4>
                <p className="footer-link">Contract research</p>
                <p className="footer-link">Team</p>
                <p className="footer-link">Partners</p>
                <p className="footer-link">Blog</p>
              </div>
              {/* <div className="footer_element">
                <h4 className="footer_header">Information</h4>
                <p className="footer-link">About Us</p>
                <p className="footer-link">Privacy Policy</p>
                <p className="footer-link">Terms and Conditions</p>
                <p className="footer-link">Press Enquiries</p>
              </div> */}
            </div>

            <div className="footer_right">
              <img
                className="logos"
                src={facebookLogo}
                height="24px"
                alt="fb"
              />
              <img
                className="logos"
                src={twitterLogo}
                height="24px"
                alt="twitter"
              />

              <img
                className="logos"
                src={instagramLogo}
                height="24px"
                alt="instagram"
              />
            </div>
          </div>
          <div className="footer-lower">
            <span>© ChemAlive 2019</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Home);
