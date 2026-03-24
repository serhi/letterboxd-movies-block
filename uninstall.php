<?php
/**
 * Uninstall: remove all plugin data from the database.
 *
 * Runs when the plugin is deleted (not just deactivated) via the WordPress admin.
 *
 * @package LetterboxdMoviesBlock
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Delete plugin option.
delete_option( 'lbm_username' );

// Delete all cached transients.
global $wpdb;
$wpdb->query(
	"DELETE FROM {$wpdb->options}
	 WHERE option_name LIKE '_transient_lbm_%'
	    OR option_name LIKE '_transient_timeout_lbm_%'"
);
