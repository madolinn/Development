contact_emails = {
   'Sue Reyn' : 's.reyn@email.com',
   'Mike Filt': 'mike.filt@bmail.com',
   'Nate Arty': 'narty042@nmail.com'
}

for emails in contact_emails:
  print(type(emails))
  print("%s is" %emails, emails[0])