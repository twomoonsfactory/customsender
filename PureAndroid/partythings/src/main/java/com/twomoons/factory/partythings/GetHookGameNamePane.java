package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookGameNamePane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View pane;
    private final TextView gameNameText;
    private final EditText nameEditText;

    public GetHookGameNamePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.pane = ctx.getViewById(R.id.gameNamePane);
        this.gameNameText = (TextView) ctx.getViewById(R.id.enterGameNameText);
        this.nameEditText = (EditText) ctx.getViewById(R.id.editText);
        setupListener();
    }

    private void setupListener() { hub.RegisterMsgr(this,CommunicatorEvents.EnterGameNameEnter); }

    public void hidePane(){ pane.setVisibility(View.GONE); }

    public void showPane(){ pane.setVisibility(View.VISIBLE);}

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterGameNameEnter) {
            showPane();
        }
    }
}
