<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<%
String name = "World";
String PASSWORD = "password1";
%>
<p>
Hello <% out.print(name); %>.
</p>
<p>
Current time is <%= (new java.util.Date()).toString() %>.
</p>
<p>
Password is '<%= PASSWORD %>'.
</p>

</body>
</html>
