export class MockToastService {
  success() {
    return new Promise((resolve) => {
      resolve();
    });
  }

  danger() {
    return new Promise((resolve) => {
      resolve();
    });
  }

  info() {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
