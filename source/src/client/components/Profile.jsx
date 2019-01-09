import React from 'react'

const Profile = props => {
  console.log(props)

  //I set up the API as so if the user is not logged in it stores and object with only 1 key.
  //This is not a good way compared to the other way with the isAuthenticated function.
  //but i did it this way aswell as an example, if it's usefull in another case.
  return Object.keys(props.user).length > 1 ? (
    <img src={props.user.img_url} alt='user imge' />
  ) : (
    <h1>Please log in to see your profile information</h1>
  )
}

export default Profile
