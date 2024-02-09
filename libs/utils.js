const authVerified = () => {
  
    // Retrieve the stored token and role from local storage
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
  
    // Check if both token and role are present
    if (storedToken && storedRole) {
      try {

        // Optionally log token and role for debugging
        // console.log('Token:', storedToken);
        // console.log('Role:', storedRole);

        // Return an object with token and role
        return { token: storedToken, role: storedRole };

      } catch (error) {

        // Log and handle parsing errors
        console.error('Error parsing stored token or role:', error);
        return false; // Return false in case of errors

      }
    } else {

      // Return false if either token or role is missing in local storage
      return false;

    }
  }

export default authVerified;