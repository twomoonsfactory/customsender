package com.twomoons.factory.partythings;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.List;

/**
 * Created by JnA-PC on 5/6/2015.
 */
public class ItemSelectionAdapter extends ArrayAdapter<SelectionItem> {

    private List<SelectionItem> items;
    private int layoutResourceId;
    private Context context;

    public ItemSelectionAdapter(Context context, int layoutResourceId) {
        super(context, layoutResourceId);
        this.layoutResourceId = layoutResourceId;
        this.context = context;
//        this.items = items;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row;
        SelectionItem holder;

        LayoutInflater inflater = ((Activity) context).getLayoutInflater();
        row = inflater.inflate(layoutResourceId, parent, false);

        holder = new SelectionItem();
        holder.set_button((Button)row.findViewById(R.id.list_selection_button));

        row.setTag(holder);
        setupItem(holder);

        return row;
    }

    public void selectItem(View v) {
        SelectionItem itemToRemove = (SelectionItem)v.getTag();
    }

    private void setupItem(SelectionItem holder) {
        holder._button.setText(holder.get_label());
    }

}
