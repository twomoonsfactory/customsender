package com.twomoons.factory.partythings;

import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.support.v7.app.MediaRouteActionProvider;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.cast.CastDevice;
import com.google.android.gms.cast.CastMediaControlIntent;
import com.google.sample.castcompanionlibrary.cast.DataCastManager;
import com.google.sample.castcompanionlibrary.cast.callbacks.DataCastConsumerImpl;
import com.google.sample.castcompanionlibrary.cast.callbacks.IDataCastConsumer;
import com.google.sample.castcompanionlibrary.cast.exceptions.NoConnectionException;
import com.google.sample.castcompanionlibrary.cast.exceptions.TransientNetworkDisconnectionException;

import java.io.IOException;


public class MainActivity extends ActionBarActivity {

    private DataCastManager mCaster;
    private String mNamespace = "urn:x-cast:com.pt.basic";
    private TextView mText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Button button = (Button) findViewById(R.id.click_me_button);
        mText = (TextView) findViewById(R.id.displayText);
        button.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                mText.setText("Sending Message");
                try{
                    mCaster.sendDataMessage("Marco", mNamespace);
                } catch(IOException ex){
                    Log.e("MESSAGE_FAILED_IO", "Failed to send message: " + ex);
                } catch(TransientNetworkDisconnectionException ex) {
                    Log.e("MESSAGE_FAILED_NET", "Failed to send message: " + ex);
                } catch(NoConnectionException ex) {
                    Log.e("MESSAGE_FAILED_CONN", "Failed to send message: " + ex);
                }
            }
        });

        mCaster = DataCastManager.initialize(this, "285A9A14", mNamespace);
        //mCaster.enableFeatures(DataCastManager.FEATURE_WIFI_RECONNECT);
        mCaster.addDataCastConsumer(new CastMessageConsumer());
    }

    private class CastMessageConsumer extends DataCastConsumerImpl {
        @Override
        public void onMessageReceived(CastDevice castDevice, String namespace, String message) {
            mText.setText(message);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        mCaster.addMediaRouterButton(menu, R.id.media_route_menu_item);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onResume(){
        mCaster.incrementUiCounter();
        super.onResume();
    }

    @Override
    public void onPause(){
        mCaster.decrementUiCounter();
        super.onPause();
    }
}
