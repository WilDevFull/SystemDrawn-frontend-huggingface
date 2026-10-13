import * as ReactNativeWeb from 'react-native-web';

const TurboModuleRegistry = {
  get: (name: string) => {
    const nativeModules = (ReactNativeWeb as any).NativeModules ?? {};
    return nativeModules[name] ?? {};
  },
  getEnforcing: (name: string) => {
    const nativeModules = (ReactNativeWeb as any).NativeModules ?? {};
    const module = nativeModules[name];
    if (!module) {
      throw new Error(`TurboModuleRegistry.getEnforcing(...): '${name}' could not be found.`);
    }
    return module;
  },
};

export * from 'react-native-web';
export { TurboModuleRegistry };
export default ReactNativeWeb;
