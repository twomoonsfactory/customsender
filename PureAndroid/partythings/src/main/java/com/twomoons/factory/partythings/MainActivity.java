package com.twomoons.factory.partythings;

import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.support.v7.app.MediaRouteActionProvider;
import android.support.v7.media.MediaRouteSelector;
import android.support.v7.media.MediaRouter;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.gms.cast.CastMediaControlIntent;


public class MainActivity extends ActionBarActivity {

    private MediaRouter mMediaRouter;
    private MediaRouteSelector mMediaRouteSelector;
    private PartyMediaRouterCallback mMediaRouterCallback;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Button button = (Button) findViewById(R.id.click_me_button);
        final TextView text = (TextView) findViewById(R.id.displayText);
        button.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                    text.setText("This is new Text");
            }
        });

        mMediaRouter = MediaRouter.getInstance(getApplicationContext());
        mMediaRouteSelector = new MediaRouteSelector.Builder()
                .addControlCategory(CastMediaControlIntent.categoryForCast("285A9A14"))
                .build();

        mMediaRouterCallback = new PartyMediaRouterCallback();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        MenuItem mediaRouteMenuItem = menu.findItem(R.id.media_route_menu_item);
        MediaRouteActionProvider mediaRouteActionProvider =
                (MediaRouteActionProvider) MenuItemCompat.getActionProvider(mediaRouteMenuItem);
        mediaRouteActionProvider.setRouteSelector(mMediaRouteSelector);
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
    protected void onResume(){
        super.onResume();
        addCallback();
    }

    private void addCallback(){
        mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY);
    }

    private void removeCallback(){
        mMediaRouter.removeCallback(mMediaRouterCallback);
    }

    @Override
    protected void onPause() {
        if(isFinishing()){
            removeCallback();
        }
        super.onPause();
    }

    @Override
    protected void onStart() {
        super.onStart();
        addCallback();
    }

    @Override
    protected void onStop() {
        removeCallback();
        super.onStop();
    }
}
