export default {
  getErrorMesssage: (error, dispatch) => {
    let message = '';
    if (error && error.response && error.response.data) {
      message = error.response.data.message || error.message;
    } else if (error && error.message) {
      message = error.message;
    } else {
      message = error;
    }
    return message;
  }
}
