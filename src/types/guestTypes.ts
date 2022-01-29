export interface Guest {
  id: string;
  name: string;
  code: string;
  hasCheckin?: boolean;
  tags: string[];
}

export type CreateGuestDto = Omit<Guest, 'id'>;

export type UpdateGuestDto = Partial<
  Pick<Guest, 'name' | 'tags' | 'hasCheckin'>
>;
