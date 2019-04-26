<?php
session_start();
session_destroy();
setcookie("CookieMy", "", time() - 3600);
