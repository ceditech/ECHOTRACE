import type {
  AssetReference,
  ChangeId,
  CharacterId,
  ObjectId,
  SceneId,
  TextReference,
} from "./identity";

// Coordinates and extents are normalized to the scene; T04 validates their range.
export interface ScenePoint {
  readonly x: number;
  readonly y: number;
}

export interface SceneSize {
  readonly width: number;
  readonly height: number;
}

export interface ObjectDefinition {
  readonly id: ObjectId;
  readonly description: TextReference;
  readonly characterId?: CharacterId;
}

export interface ObjectVisual {
  readonly objectId: ObjectId;
  readonly asset: AssetReference;
  readonly position: ScenePoint;
  readonly size: SceneSize;
  readonly rotationDegrees: number;
}

export type RegionGeometry =
  | {
      readonly kind: "rectangle";
      readonly origin: ScenePoint;
      readonly size: SceneSize;
    }
  | {
      readonly kind: "circle";
      readonly center: ScenePoint;
      readonly radius: number;
    };

// A missing object's region survives independently of its visual representation.
export interface InteractionRegion {
  readonly objectId: ObjectId;
  readonly geometry: RegionGeometry;
}

export interface SceneDefinition {
  readonly id: SceneId;
  readonly background: AssetReference;
  readonly visuals: readonly ObjectVisual[];
  readonly interactionRegions: readonly InteractionRegion[];
}

export type ObjectRelationship = "under" | "beside" | "on" | "near" | "inside";

export interface RelationshipReference {
  readonly objectId: ObjectId;
  readonly relation: ObjectRelationship;
  readonly relatedObjectId: ObjectId;
}

interface ChangeBase {
  readonly id: ChangeId;
  readonly observationSceneId: SceneId;
  readonly investigationSceneId: SceneId;
  readonly significance: "meaningful" | "decorative";
  readonly isRequired: boolean;
}

// Finite authored descriptions, never executable case-specific callbacks.
export type ChangeDefinition = ChangeBase &
  (
    | {
        readonly kind: "object_added" | "object_removed";
        readonly objectId: ObjectId;
      }
    | {
        readonly kind: "object_moved";
        readonly objectId: ObjectId;
        readonly from: ScenePoint;
        readonly to: ScenePoint;
      }
    | {
        readonly kind: "object_rotated";
        readonly objectId: ObjectId;
        readonly fromDegrees: number;
        readonly toDegrees: number;
      }
    | {
        readonly kind: "object_opened_closed";
        readonly objectId: ObjectId;
        readonly before: "open" | "closed";
        readonly after: "open" | "closed";
      }
    | {
        readonly kind: "object_exchanged";
        readonly objectIds: readonly [ObjectId, ObjectId];
      }
    | {
        readonly kind: "object_state_changed";
        readonly objectId: ObjectId;
        readonly beforeState: string;
        readonly afterState: string;
      }
    | {
        readonly kind: "object_quantity_changed";
        readonly objectId: ObjectId;
        readonly beforeQuantity: number;
        readonly afterQuantity: number;
      }
    | {
        readonly kind: "relationship_changed";
        readonly before: RelationshipReference;
        readonly after: RelationshipReference;
      }
  );
