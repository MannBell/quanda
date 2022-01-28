import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
// Components
import HomeCard from "../cards/HomeCard";
// Constants
import { cards } from "../../myPlugins/constants/homeCards";

const Home = (props) => {
  if(!props.firebaseAuth.uid) return <Redirect to="/"/>

  return (
    <main id="about" className="pt-5 mb-5 p-sm-5 nav-margin">
      <div className="container">
        <h1 className="text-info"><i className="fas fa-home"></i> Home</h1>
        <h3 className="mb-5">Choose a category:</h3>
        <div className="row gy-5 g-sm-5">
          {
            cards.map(({ title, content, icon, link }, i) => {
              return (
                <HomeCard
                  key={ i }
                  title={ title }
                  content={ content }
                  icon={ icon }
                  link={ link }
                />
              );
            })
          }
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = ({ firebase: { auth: firebaseAuth } }) => ({
  firebaseAuth
})

export default connect(mapStateToProps)(Home);