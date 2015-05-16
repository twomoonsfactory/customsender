package com.twomoons.factory.partythings;

import android.widget.Button;

/**
 * Created by JnA-PC on 5/6/2015.
 */
public class SelectionItem {
    String _label;
    int _id;

    public Button get_button() {
        return _button;
    }

    public void set_button(Button _button) {
        this._button = _button;
    }

    Button _button;

    public String get_label() {
        return _label;
    }

    public void set_label(String _label) {
        this._label = _label;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }
}
