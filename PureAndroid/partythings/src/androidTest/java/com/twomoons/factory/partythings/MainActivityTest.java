package com.twomoons.factory.partythings;

import android.content.Intent;
import android.test.ActivityUnitTestCase;
import android.view.ContextThemeWrapper;
import static org.mockito.Mockito.*;

/**
 * Created by JnA-PC on 4/14/2015.
 */
public class MainActivityTest extends ActivityUnitTestCase<MainActivity> {

    private MainActivity mActivity;
    private Intent mIntent;

    public MainActivityTest() {
        super(MainActivity.class);
    }

    @Override
    protected void setUp() throws Exception {
        super.setUp();
        ContextThemeWrapper context = new ContextThemeWrapper(getInstrumentation().getTargetContext(), R.style.AppTheme);
        setActivityContext(context);
        mIntent = new Intent(context, MainActivity.class);
        this.startActivity(mIntent, null, null);
        mActivity = getActivity();
        //mFirstTestText = (TextView) mFirstTestActivity.findViewById(R.id.my_first_test_text_view);

        mock(ICommunicator.class);
    }

    public void testPreconditions() {
        assertNotNull("activity is null", mActivity
        );
    }
}
