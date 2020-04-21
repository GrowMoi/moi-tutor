export class MockLoadingService {
  present() {
    return new Promise((resolve) => {
      resolve({
        dismiss: () => new Promise((r) => r())
      });
    });
  }

}
