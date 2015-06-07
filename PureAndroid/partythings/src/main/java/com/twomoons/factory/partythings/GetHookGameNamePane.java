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
    private final View ghGameNamePane;
    private final TextView ghEnterGameNameText;
    private final EditText ghEditText;

    public GetHookGameNamePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghGameNamePane = ctx.getViewById(R.id.gameNamePane);
        this.ghEnterGameNameText = (TextView) ctx.getViewById(R.id.enterGameNameText);
        this.ghEditText = (EditText) ctx.getViewById(R.id.editText);
        setupListener();
    }

    private void setupListener() { hub.RegisterMsgr(this,CommunicatorEvents.EnterGameNameEnter); }

    public void hidePane(){ ghGameNamePane.setVisibility(View.GONE); }

    public void showPane(){ ghGameNamePane.setVisibility(View.VISIBLE);}

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterGameNameEnter) {
            showPane();
        }
    }
}
