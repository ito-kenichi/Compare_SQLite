using System;
using System.Collections.Generic;

using Xamarin.Forms;

namespace xamarin.forms_project
{
    public partial class NotesPage : ContentPage
    {
        public NotesPage()
        {
            InitializeComponent();
        }
        protected override async void OnAppearing()
        {
            base.OnAppearing();

            listView.ItemsSource = await App.Database.GetNotesAsync();
        }

        public void OnNoteAddedClicked(object sender, EventArgs e)
        {
        }

        public void OnListViewItemSelected(object sender, EventArgs e)
        {
        }
    }
}
