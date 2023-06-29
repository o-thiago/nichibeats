/*
 * Making this was like hell but worst.
 * Atleast i now have a nice abstraction to work on i guess.
 */

import React, {
  Context,
  Key,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";

type ContextStore<K extends Key, V> = Map<K, Context<V>>;

function grabFromStore<K extends Key, V>(store: ContextStore<K, V>, key: K) {
  return store.get(key)!;
}

function createContextWithKey<K extends Key, V>(
  store: ContextStore<K, V>,
  key: K,
  value: V
) {
  if (!store.has(key)) {
    store.set(key, createContext(value));
  }

  return grabFromStore(store, key);
}

function useContextWithKey<K extends Key, V>(
  store: ContextStore<K, V>,
  key: K
) {
  return useContext(grabFromStore(store, key));
}

type MapContextProviderProps<K extends Key, V> = {
  contextStore: ContextStore<K, V>;
  contextKeys: K[];
  contextCreator: (key: K) => V;
};

function MapContextProvider<K extends Key, V>({
  contextStore,
  contextKeys,
  contextCreator,
  children,
}: PropsWithChildren<MapContextProviderProps<K, V>>) {
  const providers = contextKeys.map((key) => {
    const value = contextCreator(key);
    const Context = createContextWithKey(contextStore, key, value);

    return (
      <Context.Provider key={key} value={value}>
        {children}
      </Context.Provider>
    );
  });

  return <>{providers}</>;
}

export { MapContextProvider, useContextWithKey };

export type { ContextStore, MapContextProviderProps };
