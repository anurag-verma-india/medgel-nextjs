export type list_edit_object = {
  _id: string;
  product_list_name: string;
};

export type list_move_object = {
  move_to_category_id: string;
  product_list_id: string;
};

export type product_category_put_request_body = {
  product_category_id: string;
  product_category_name?: string;
  lists_to_edit?: list_edit_object[];
  list_names_to_add?: string[];
  lists_to_delete?: string[];
  lists_to_move?: list_move_object[];
};
