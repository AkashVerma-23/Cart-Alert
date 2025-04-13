import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="settings-section">
      <h3>About This App</h3>
      <p>'Cart Alert' is a smart, location-based shopping list application
        built using React and the Google Maps JavaScript API. This app is
        designed to help users remember what they need to buy when they're near
        a store that sells those items — perfect for people who often forget
        their shopping list until it's too late. </p>
        <p>'Cart Alert' ,helps you
        remember what items to buy when you're near relevant stores. The app
        uses your device's location and compares it with nearby store locations
        to send you timely reminders.
      </p>
      <p>
        Your data remains on your device and is never shared with any third
        parties.
      </p>
    </div>
  );
}

export default About