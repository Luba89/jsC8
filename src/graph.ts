import {
  C8Collection,
  BaseCollection,
  CollectionType,
  DocumentHandle,
  DOCUMENT_NOT_FOUND,
  EdgeCollection,
  isC8Collection,
} from "./collection";
import { Connection } from "./connection";
import { isC8Error } from "./error";

export class GraphVertexCollection extends BaseCollection {
  type = CollectionType.DOCUMENT_COLLECTION;

  graph: Graph;

  constructor(connection: Connection, name: string, graph: Graph) {
    super(connection, name);
    this.graph = graph;
  }

  document(
    documentHandle: DocumentHandle,
    graceful: boolean = false,
    opts: Record<string, any> = {}
  ): Promise<any> {
    const result = this._connection.request(
      {
        path: `/_api/graph/${this.graph.name}/vertex/${this._documentHandle(
          documentHandle
        )}`,
        qs: opts,
      },
      (res) => res.body.vertex
    );
    if (!graceful) return result;
    return result.catch((err) => {
      if (isC8Error(err) && err.errorNum === DOCUMENT_NOT_FOUND) {
        return null;
      }
      throw err;
    });
  }

  vertex(
    documentHandle: DocumentHandle,
    graceful: boolean = false
  ): Promise<any> {
    return this.document(documentHandle, graceful);
  }

  save(data: any, opts?: { waitForSync?: boolean; returnNew?: boolean }) {
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.graph.name}/vertex/${this.name}`,
        body: data,
        qs: opts,
      },
      (res) => res.body
    );
  }

  replace(
    documentHandle: DocumentHandle,
    newValue: any,
    opts: Record<string, any> = {}
  ) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "PUT",
        path: `/_api/graph/${this.graph.name}/vertex/${this._documentHandle(
          documentHandle
        )}`,
        body: newValue,
        qs: opts,
        headers,
      },
      (res) => res.body.vertex
    );
  }

  update(
    documentHandle: DocumentHandle,
    newValue: any,
    opts: Record<string, any> = {}
  ) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "PATCH",
        path: `/_api/graph/${this.graph.name}/vertex/${this._documentHandle(
          documentHandle
        )}`,
        body: newValue,
        qs: opts,
        headers,
      },
      (res) => res.body.vertex
    );
  }

  remove(documentHandle: DocumentHandle, opts: Record<string, any> = {}) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "DELETE",
        path: `/_api/graph/${this.graph.name}/vertex/${this._documentHandle(
          documentHandle
        )}`,
        qs: opts,
        headers,
      },
      (res) => res.body
    );
  }
}

export class GraphEdgeCollection extends EdgeCollection {
  type = CollectionType.EDGE_COLLECTION;

  graph: Graph;

  constructor(connection: Connection, name: string, graph: Graph) {
    super(connection, name);
    this.type = CollectionType.EDGE_COLLECTION;
    this.graph = graph;
  }

  document(
    documentHandle: DocumentHandle,
    graceful: boolean = false,
    opts: Record<string, any> = {}
  ): Promise<any> {
    const headers: { [key: string]: string } = {};
    if (opts["if-none-match"]) {
      let ifNoneMatch: string;
      ({ ["if-none-match"]: ifNoneMatch, ...opts } = opts);
      headers["if-none-match"] = ifNoneMatch;
    }
    if (opts["if-match"]) {
      let ifMatch: string;
      ({ ["if-match"]: ifMatch, ...opts } = opts);
      headers["if-match"] = ifMatch;
    }
    const result = this._connection.request(
      {
        path: `/_api/graph/${this.graph.name}/edge/${this._documentHandle(
          documentHandle
        )}`,
        qs: opts,
        headers,
      },
      (res) => res.body.edge
    );
    if (!graceful) return result;
    return result.catch((err) => {
      if (isC8Error(err) && err.errorNum === DOCUMENT_NOT_FOUND) {
        return null;
      }
      throw err;
    });
  }

  save(
    data: any,
    fromId?: DocumentHandle | any,
    toId?: DocumentHandle,
    opts?: { waitForSync?: boolean; returnNew?: boolean }
  ) {
    if (fromId !== undefined) {
      if (toId !== undefined) {
        data._from = this._documentHandle(fromId);
        data._to = this._documentHandle(toId!);
      } else {
        opts = fromId;
      }
    }
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.graph.name}/edge/${this.name}`,
        body: data,
        qs: opts,
      },
      (res) => res.body
    );
  }

  replace(
    documentHandle: DocumentHandle,
    newValue: any,
    opts: Record<string, any> = {}
  ) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "PUT",
        path: `/_api/graph/${this.graph.name}/edge/${this._documentHandle(
          documentHandle
        )}`,
        body: newValue,
        qs: opts,
        headers,
      },
      (res) => res.body.edge
    );
  }

  update(
    documentHandle: DocumentHandle,
    newValue: any,
    opts: Record<string, any> = {}
  ) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "PATCH",
        path: `/_api/graph/${this.graph.name}/edge/${this._documentHandle(
          documentHandle
        )}`,
        body: newValue,
        qs: opts,
        headers,
      },
      (res) => res.body.edge
    );
  }

  remove(documentHandle: DocumentHandle, opts: Record<string, any> = {}) {
    const headers: { [key: string]: string } = {};
    if (typeof opts === "string") {
      opts = { rev: opts };
    }
    if (opts.rev) {
      let rev: string;
      ({ rev, ...opts } = opts);
      headers["if-match"] = rev;
    }
    return this._connection.request(
      {
        method: "DELETE",
        path: `/_api/graph/${this.graph.name}/edge/${this._documentHandle(
          documentHandle
        )}`,
        qs: opts,
        headers,
      },
      (res) => res.body.removed
    );
  }
}

const GRAPH_NOT_FOUND = 1924;

export class Graph {
  name: string;

  private _connection: Connection;

  constructor(connection: Connection, name: string) {
    this.name = name;
    this._connection = connection;
  }

  get() {
    return this._connection.request(
      { path: `/_api/graph/${this.name}` },
      (res) => res.body.graph
    );
  }

  exists(): Promise<boolean> {
    return this.get().then(
      () => true,
      (err) => {
        if (isC8Error(err) && err.errorNum === GRAPH_NOT_FOUND) {
          return false;
        }
        throw err;
      }
    );
  }

  create(properties: any = {}) {
    return this._connection.request(
      {
        method: "POST",
        path: "/_api/graph",
        body: {
          ...properties,
          name: this.name,
        },
      },
      (res) => res.body.graph
    );
  }

  drop(dropCollections: boolean = false) {
    return this._connection.request(
      {
        method: "DELETE",
        path: `/_api/graph/${this.name}`,
        qs: { dropCollections },
      },
      (res) => res.body.removed
    );
  }

  vertexCollection(collectionName: string) {
    return new GraphVertexCollection(this._connection, collectionName, this);
  }

  listVertexCollections() {
    return this._connection.request(
      { path: `/_api/graph/${this.name}/vertex` },
      (res) => res.body.collections
    );
  }

  async vertexCollections() {
    const names = await this.listVertexCollections();
    return names.map(
      (name: any) => new GraphVertexCollection(this._connection, name, this)
    );
  }

  addVertexCollection(collection: string | C8Collection) {
    if (isC8Collection(collection)) {
      collection = collection.name;
    }
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.name}/vertex`,
        body: { collection },
      },
      (res) => res.body.graph
    );
  }

  removeVertexCollection(
    collection: string | C8Collection,
    dropCollection: boolean = false
  ) {
    if (isC8Collection(collection)) {
      collection = collection.name;
    }
    return this._connection.request(
      {
        method: "DELETE",
        path: `/_api/graph/${this.name}/vertex/${collection}`,
        qs: {
          dropCollection,
        },
      },
      (res) => res.body.graph
    );
  }

  edgeCollection(collectionName: string) {
    return new GraphEdgeCollection(this._connection, collectionName, this);
  }

  listEdgeCollections() {
    return this._connection.request(
      { path: `/_api/graph/${this.name}/edge` },
      (res) => res.body.collections
    );
  }

  async edgeCollections() {
    const names = await this.listEdgeCollections();
    return names.map(
      (name: any) => new GraphEdgeCollection(this._connection, name, this)
    );
  }

  addEdgeDefinition(definition: any) {
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.name}/edge`,
        body: definition,
      },
      (res) => res.body.graph
    );
  }

  replaceEdgeDefinition(definitionName: string, definition: any) {
    return this._connection.request(
      {
        method: "PUT",
        path: `/_api/graph/${this.name}/edge/${definitionName}`,
        body: definition,
      },
      (res) => res.body.graph
    );
  }

  removeEdgeDefinition(
    definitionName: string,
    dropCollection: boolean = false
  ) {
    return this._connection.request(
      {
        method: "DELETE",
        path: `/_api/graph/${this.name}/edge/${definitionName}`,
        qs: {
          dropCollection,
        },
      },
      (res) => res.body.graph
    );
  }

  //todo New Edge Endpoints

  // todo Add Vertex to given collection
  addVertexToCollection(
    collectionName: string,
    properties: any = {},
    returnNew: boolean = false
  ) {
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.name}/vertex/${collectionName}`,
        body: {
          ...properties,
        },
        qs: {
          returnNew,
        },
      },
      (res) => res.body
    );
  }

  // todo Add new Edge to given collection
  addEdgeToEdgeCollection(
    edgeCollectionName: string,
    properties: any = {},
    returnNew: boolean = false
  ) {
    return this._connection.request(
      {
        method: "POST",
        path: `/_api/graph/${this.name}/edge/${edgeCollectionName}`,
        body: {
          ...properties,
        },
        qs: {
          returnNew,
        },
      },
      (res) => res.body
    );
  }
}
