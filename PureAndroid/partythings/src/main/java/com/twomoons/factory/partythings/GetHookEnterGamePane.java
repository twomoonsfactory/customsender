package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by Joshua on 5/20/2015.
 */
public class GetHookEnterGamePane implements IMsgHandler{
    private final Hub hub;
    private final MainActivity ctx;
    private final View pane;
    private final TextView createText;
    private final TextView createPlayerNameText;
    private final EditText createEditText2;
    private final Button createButton;


    public GetHookEnterGamePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.pane = ctx.getViewById(R.id.enterGamePane);
        this.createText = (TextView) ctx.getViewById(R.id.createGameText);
        this.createPlayerNameText = (TextView) ctx.getViewById(R.id.enterPlayerNameText);
        this.createEditText2 = (EditText) ctx.getViewById(R.id.editText2);
        this.createButton = (Button) ctx.getViewById(R.id.createGameButton);
        setupListener();
    }

    private void setupListener() { hub.RegisterMsgr(this,CommunicatorEvents.EnterGameEnter); }

    public void hidePane(){
        pane.setVisibility(View.GONE);
    }

    public void showPane() { pane.setVisibility(View.VISIBLE); }

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterGameEnter) {
            showPane();
        }
    }
}
