package com.twomoons.factory.partythings;

import android.content.Context;
import android.view.Menu;

public interface ICommunicator {
    void Initialize(Context ctx);
    void InitializeMenu(Menu menu, int media_route_menu_item);
    void OnResume();
    void OnPause();
}
