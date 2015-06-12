package com.twomoons.factory.partythings;

import android.text.Editable;
import android.view.View;
import android.widget.Button;
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
    private final EditText ghGameEditText;
    private final Button ghEnterGameNameButton;
    private final EditText ghPlayerEditText;

    public GetHookGameNamePane(MainActivity ctx, Hub communicationHub){
        this.ctx = ctx;
        this.hub = communicationHub;
        this.ghGameNamePane = ctx.getViewById(R.id.gameNamePane);
        this.ghEnterGameNameText = (TextView) ctx.getViewById(R.id.enterGameNameText);
        this.ghGameEditText = (EditText) ctx.getViewById(R.id.editText);
        this.ghPlayerEditText = (EditText) ctx.getViewById(R.id.editText2);
        this.ghEnterGameNameButton = (Button) ctx.getViewById(R.id.connectedButton);
        setupListener();
        setupSubmitButton();
    }

    private void setupSubmitButton() {
        this.ghEnterGameNameButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                hidePane();
                String gameName = ghGameEditText.getText().toString();
                String playerName = ghPlayerEditText.getText().toString();

                hub.SendMessage(CommunicatorEvents.EnterGameNameExit, gameName + " :: " + playerName);
            }
        });
    }

    private void setupListener() { hub.RegisterMsgr(this, CommunicatorEvents.EnterGameNameEnter); }

    public void hidePane(){ ghGameNamePane.setVisibility(View.GONE); }

    public void showPane(){ ghGameNamePane.setVisibility(View.VISIBLE);}

    public void hideGameNamePane(){ ghGameNamePane.setVisibility(View.GONE);}

    @Override
    public void HandleMessage(CommunicatorEvents eventType, String message) {
        if(eventType == CommunicatorEvents.EnterGameNameEnter) {
            showPane();
            if(message == "gameExists") {
                hideGameNamePane();
            }
        }
    }
}
