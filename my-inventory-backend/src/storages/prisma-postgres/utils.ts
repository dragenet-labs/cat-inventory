interface UpdatedAtInterface {
  updatedAt: Date;
}

type DataWithUpdatedAt<T> = T & UpdatedAtInterface;

export function dataWithUpdatedAt<T>(data: T): DataWithUpdatedAt<T> {
  return {
    ...data,
    updatedAt: new Date()
  };
}
