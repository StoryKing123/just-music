#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod command;
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::song::my_custom_command,
            command::song::get_song_url
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
