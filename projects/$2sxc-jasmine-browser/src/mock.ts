// interface JQuery {
//   ServicesFramework: any
// }
// interface JQueryStatic {
//   ServicesFramework: any
// }

const ROOTVERSION = 'mock-version';
console.log('stv#1 mock', ROOTVERSION);

(window as any).ROOTVERSION = ROOTVERSION;

($ as any).ServicesFramework = (x: number) => {
  const getServiceRoot = (key: string) => 'mock.apiRoot';
  const getTabId = () => 42;
  const getAntiForgeryValue = () => 'mock-AntiForgeryValue';
  return {
    getServiceRoot, getTabId, getAntiForgeryValue
  };
};
