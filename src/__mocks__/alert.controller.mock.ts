export class MockAlertController {
  create() {
    return Promise.resolve({
      present: (): Promise<void> => {
          return Promise.resolve();
      }
    } as HTMLIonAlertElement);
  }
}
