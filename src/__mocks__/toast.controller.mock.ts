export class MockToastController {
  create() {
    return Promise.resolve({
      present: (): Promise<void> => {
        return Promise.resolve();
      }
    });
  }
}
